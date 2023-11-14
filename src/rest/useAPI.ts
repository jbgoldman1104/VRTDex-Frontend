import { useAddress, useNetwork } from "hooks"

import { useCallback } from "react"
import useURL from "hooks/useURL"
import axios from "./request"
import { Type } from "pages/Swap"
import { Coin, Coins, Msg } from "@terra-money/terra.js"
import { MsgExecuteContract } from "@terra-money/terra.js"
import { AxiosError } from "axios"
import { getDeadlineSeconds } from "libs/utils"
import { getSigningCosmWasmClient } from "@sei-js/core"
import { from } from "@apollo/client"
import { DEFAULT_MAX_SPREAD } from "constants/constants"
import { AnyNsRecord } from "dns"
import { Params } from "@terra-money/terra.js/dist/core/ibc/applications/interchain-account/controller/Params"
import { toAmount } from "libs/parse"

const DECIMALS = 6

interface DenomBalanceResponse {
  pagination: { next_key: string | null; total: string }
  balances: DenomInfo[]
}

interface DenomInfo {
  denom: string
  amount: string
}
interface LcdContractBalanceResponse {
  data: ContractBalance
}

interface ContractBalance {
  balance: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Pairs {
  pairs: Pair[]
}

export interface Pair {
  pair: TokenInfo[]
  contract: string
  liquidity_token: string
}

interface TokenInfo {
  symbol: string
  name: string
  contract_addr: string
}

interface PairContractResponse {
  asset_decimals: [number]
  liquidity_token: string
  contract_addr: string
  asset_infos: (NativeInfo | AssetInfo)[]
}

interface PairsResponse {
  height: string
  result: PairsResult
}

interface PairsResult {
  pairs: PairResult[]
}

interface PairResult {
  liquidity_token: string
  contract_addr: string
  asset_infos: (NativeInfo | AssetInfo)[]
}

interface TokenResult {
  name: string
  symbol: string
  decimals: number
  total_supply: string
  contract_addr: string
  icon: string
  verified: boolean
}

interface PoolResponse {
  data: Pool
}

interface Pool {
  assets: Token[]
  total_share: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PoolResult {
  estimated: string
  price1: string
  price2: string
  afterPool: string
  LP: string
  // fromLP: Asset[]
  // text: string
}

interface SimulatedResponse {
  height: string
  result: SimulatedData
}
interface SimulatedData {
  return_amount: string
  offer_amount: string
  commission_amount: string
  spread_amount: string
}

export function isAssetInfo(object: any): object is AssetInfo {
  return "token" in object
}

export function isNativeInfo(object: any): object is NativeInfo {
  return "native_token" in object
}

export function getAssetInfo(token: string): NativeInfo | AssetInfo {
  if (token.startsWith("sei")) {
    return { token: { contract_addr: token } }
  }
  return { native_token: { denom: "usei" } }
}

const useAPI = () => {
  const { lcd, factory, service } = useNetwork()
  const address = useAddress()
  const getURL = useURL()

  // useBalance
  const loadDenomBalance = useCallback(async () => {
    const url = `${lcd}/cosmos/bank/v1beta1/balances/${address}`
    const res: DenomBalanceResponse = (await axios.get(url)).data
    return res.balances
  }, [address, lcd])

  const loadContractBalance = useCallback(
    async (localContractAddr: string) => {
      const url = getURL(
        localContractAddr,
        { balance: { address: address } },
        lcd
      )
      const res: LcdContractBalanceResponse = (await axios.get(url)).data
      return res.data
    },
    [address, getURL, lcd]
  )

  const loadPairContract = useCallback(
    async (token1: string, token2: string) => {
      try {
        const url = getURL(
          factory,
          {
            pair: { asset_infos: [getAssetInfo(token1), getAssetInfo(token2)] },
          },
          lcd
        )
        const res: PairContractResponse = (await axios.get(url)).data.data
        return [res.contract_addr, res.liquidity_token]
      } catch (error) {
        console.log(error)
        return []
      }
    },
    [getURL, lcd, factory]
  )

  // useGasPrice

  // deprecated
  const loadGasPrice = useCallback(async (symbol?: string) => {
    return "11"
  }, [])

  // usePairs
  const loadPairs = useCallback(async () => {
    let result: PairsResult = {
      pairs: [],
    }
    // let lastPair: (NativeInfo | AssetInfo)[] | null = null

    // try {
    //   const url = `${service}/pairs?unverified=true`
    //   const res: PairsResult = (await axios.get(url)).data

    //   if (res?.pairs?.length) {
    //     res.pairs.forEach((pair) => {
    //       result.pairs.push(pair)
    //     })

    //     return result
    //   }
    // } catch (error) {
    //   console.error(error)
    // }

    // while (true) {
    //   const url = getURL(factory, {
    //     pairs: { limit: 30, start_after: lastPair },
    //   })
    //   const pairs: PairsResponse = (await axios.get(url)).data

    //   if (!Array.isArray(pairs?.result?.pairs)) {
    //     // node might be down
    //     break
    //   }

    //   if (pairs.result.pairs.length <= 0) {
    //     break
    //   }

    //   pairs.result.pairs.forEach((pair) => {
    //     result.pairs.push(pair)
    //   })
    //   lastPair = pairs.result.pairs.slice(-1)[0]?.asset_infos
    // }
    return result
  }, [service, factory, getURL])

  const loadTokens = useCallback(async (): Promise<TokenResult[]> => {
    const url = `/tokens.json`
    const res: TokenResult[] = (await axios.get(url)).data
    return res
  }, [service])

  const loadSwappableTokenAddresses = useCallback(
    async (from: string) => {
      const res: any[] = (await axios.get(`/tokens.json`, { params: { from } }))
        .data
      return res.filter((item) => item.contract_addr != from)
    },
    [service]
  )

  const loadTokenInfo = useCallback(
    async (contract: string): Promise<TokenResult> => {
      const url = getURL(contract, { token_info: {} })
      const res = (await axios.get(url)).data
      return res.data
    },
    [getURL]
  )

  // usePool
  const loadPool = useCallback(
    async (contract: string) => {
      const url = getURL(contract, { pool: {} })
      const res: PoolResponse = (await axios.get(url)).data
      return res.data
    },
    [getURL]
  )

  // useSwapSimulate
  const querySimulate = useCallback(
    async (variables: { contract: string; msg: any }) => {
      try {
        const { contract, msg } = variables
        const url = getURL(contract, msg, lcd)
        const res: SimulatedResponse = (await axios.get(url)).data
        return res
      } catch (error) {
        const { response }: AxiosError = error as any
        return response?.data
      }
    },
    [getURL, lcd]
  )

  const generateSwapMessages = (
    pairContractAddr: string,
    param: any
  ): MsgExecuteContract[] => {
    let data: any[] = []

    if (param.amount) {
      param.amount = toAmount(param.amount, param.from)
    }
    // let pairContractAddr = "sei16zkheta2q6u4x7yg0k9kdhvlqlvstc5ueepj9n93a7yf0x2spyys28pwfr";
    if (!param.from.startsWith("sei")) {
      data = [
        new MsgExecuteContract(param.sender, pairContractAddr, {
          swap: {
            deadline: param.deadline,
            max_spread: param.max_spread,
            belief_price: param.belief_price,
            offer_asset: {
              info: {
                native_token: {
                  denom: "usei",
                },
              },
              amount: Number(param.amount).toString(),
            },
            to: param.to,
          },
        }),
        new Coins([new Coin("usei", Number(param.amount))]),
      ]
    } else {
      const payload =
        /*btoa(JSON.stringify(*/
        {
          swap: {
            belief_price: param.belief_price,
            max_spread: param.max_spread,
            to: param.to,
            deadline: param.deadline,
          },
        }
      // ));

      data = [
        new MsgExecuteContract(param.sender, param.from, {
          send: {
            contract: pairContractAddr,
            amount: Number(param.amount).toString(),
            msg: payload,
          },
        }),
      ]
    }

    return data
  }

  const generateProvideMessages = (
    pairContractAddr: string,
    param: any
  ): MsgExecuteContract[] => {
    let data: MsgExecuteContract[] = []
    // let pairContractAddr = "sei16zkheta2q6u4x7yg0k9kdhvlqlvstc5ueepj9n93a7yf0x2spyys28pwfr";

    let coins: Coins.Input | undefined = undefined
    if (param.fromAmount) {
      param.fromAmount = toAmount(param.fromAmount, param.from)
    }

    if (param.toAmount) {
      param.toAmount = toAmount(param.toAmount, param.from)
    }

    if (!param.from.startsWith("sei")) {
      coins = new Coins([new Coin("usei", Number(param.fromAmount))])
    } else {
      data.push(
        new MsgExecuteContract(param.sender, param.from, {
          increase_allowance: {
            spender: pairContractAddr,
            amount: (Number(param.fromAmount) * 10 ** DECIMALS).toString(),
          },
        })
      )
    }

    if (!param.to.startsWith("sei")) {
      coins = new Coins([new Coin("usei", Number(param.toAmount))])
    } else {
      data.push(
        new MsgExecuteContract(param.sender, param.to, {
          increase_allowance: {
            spender: pairContractAddr,
            amount: (Number(param.toAmount) * 10 ** DECIMALS).toString(),
          },
        })
      )
    }

    data.push(
      new MsgExecuteContract(
        param.sender,
        pairContractAddr,
        {
          provide_liquidity: {
            deadline: param.deadline,
            slippage_tolerance: Number(param.slippage).toString(),
            assets: [
              {
                info: getAssetInfo(param.from),
                amount: Number(param.fromAmount).toString(),
              },
              {
                info: getAssetInfo(param.to),
                amount: Number(param.toAmount).toString(),
              },
            ],
          },
        },
        coins
      )
    )

    if (param.from.startsWith("sei")) {
      data.push(
        new MsgExecuteContract(param.sender, param.from, {
          decrease_allowance: {
            spender: pairContractAddr,
            amount: (Number(param.fromAmount) * 10 ** DECIMALS).toString(),
          },
        })
      )
    }

    if (param.to.startsWith("sei")) {
      data.push(
        new MsgExecuteContract(param.sender, param.to, {
          decrease_allowance: {
            spender: pairContractAddr,
            amount: (Number(param.toAmount) * 10 ** DECIMALS).toString(),
          },
        })
      )
    }

    return data
  }

  const generateCreatePairMessages = (
    factory: string,
    param: any
  ): MsgExecuteContract[] => {
    let data: any[] = []

    if (param.fromAmount) {
      param.fromAmount = toAmount(param.fromAmount, param.from)
    }

    if (param.toAmount) {
      param.toAmount = toAmount(param.toAmount, param.from)
    }

    data = [
      new MsgExecuteContract(param.sender, factory, {
        create_pair: {
          assets: [
            {
              info: getAssetInfo(param.from),
              amount: "0",
            },
            {
              info: getAssetInfo(param.to),
              amount: "0",
            },
          ],
        },
      }),
    ]
    return data
  }

  const generateWidthrawMessages = (param: any): MsgExecuteContract[] => {
    let data: any[] = []
    // let pairContractAddr = "sei16zkheta2q6u4x7yg0k9kdhvlqlvstc5ueepj9n93a7yf0x2spyys28pwfr";
    if (param.amount) {
      param.amount = toAmount(param.amount, param.lpAddr)
    }

    const payload =
      /*btoa(JSON.stringify(*/
      {
        withdraw_liquidity: {
          min_assets: param.minAssets,
          deadline: param.deadline,
        },
      }
    // ));

    data = [
      new MsgExecuteContract(param.sender, param.lpAddr, {
        send: {
          contract: param.pairContract,
          amount: Number(param.amount).toString(),
          msg: payload,
        },
      }),
    ]

    return data
  }

  const generateContractMessages = useCallback(
    async (
      query:
        | {
            type: Type.SWAP
            from: string
            to: string
            amount: number | string
            max_spread: number | string
            belief_price: number | string
            sender: string
            deadline?: number
          }
        | {
            type: Type.PROVIDE
            from: string
            to: string
            fromAmount: number | string
            toAmount: number | string
            slippage: number | string
            sender: string
            deadline?: number
          }
        | {
            type: Type.WITHDRAW
            lpAddr: string
            pairContract: string
            amount: number | string
            sender: string
            minAssets?: string
            deadline?: number
          }
        | {
            type: Type.CREATE_PAIR
            from: string
            to: string
            deadline?: number
          }
    ) => {
      if (query.deadline !== undefined) {
        query.deadline = getDeadlineSeconds(query.deadline)
      }

      const { type, ...params } = query

      if (type === Type.SWAP) {
        const [pairContract] = await loadPairContract(query.from, query.to)
        return generateSwapMessages(pairContract, params)
      }

      if (type === Type.CREATE_PAIR) {
        return generateCreatePairMessages(factory, params)
      }

      if (type === Type.PROVIDE) {
        const [pairContract] = await loadPairContract(query.from, query.to)
        return generateProvideMessages(pairContract, params)
      }

      if (type === Type.WITHDRAW) {
        return generateWidthrawMessages(params)
      }

      return [] as MsgExecuteContract[]
    },
    [loadPairContract, factory]
  )

  return {
    loadDenomBalance,
    loadContractBalance,
    loadGasPrice,
    loadPairs,
    loadPairContract,
    loadTokens,
    loadSwappableTokenAddresses,
    loadTokenInfo,
    loadPool,
    querySimulate,
    generateContractMessages,
  }
}

export default useAPI

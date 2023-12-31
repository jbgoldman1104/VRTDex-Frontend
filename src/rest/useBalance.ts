import { useEffect, useState } from "react"
import { useAddress } from "../hooks"
import useAPI from "./useAPI"

export default (contractAddress: string, symbol: string) => {
  const address = useAddress()

  const { loadDenomBalance, loadContractBalance } = useAPI()

  const [balance, setBalance] = useState<string>()

  useEffect(() => {
    let isAborted = false
    try {
      if (address === "" || address === undefined) {
        setBalance("")
        return
      }
      if (!contractAddress?.startsWith("sei")) {
        loadDenomBalance().then((denomInfos) => {
          let hasDenom: boolean = false
          if (denomInfos !== undefined) {
            denomInfos.forEach((denomInfo) => {
              if (denomInfo.denom === contractAddress) {
                if (!isAborted) {
                  setBalance(denomInfo.amount)
                }
                hasDenom = true
              }
            })
          }
          if (hasDenom === false) {
            if (!isAborted) {
              setBalance("")
            }
          }
        })
      } else {
        loadContractBalance(contractAddress).then((tokenBalance) => {
          if (!isAborted) {
            setBalance(tokenBalance?.balance || "")
          }
        })
      }
    } catch (error) {
      console.error(error)
      setBalance("")
    }

    return () => {
      isAborted = true
    }
  }, [address, loadContractBalance, loadDenomBalance, contractAddress, symbol])

  return { balance }
}

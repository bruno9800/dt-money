import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateNewTransactionInput {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransaction: (query?: string) => Promise<void>
  createTransaction: (
    newTransaction: CreateNewTransactionInput,
  ) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
)
export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = useCallback(
    async (data: CreateNewTransactionInput) => {
      const response = await api.post('/transactions', {
        ...data,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  const fetchTransaction = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  useEffect(() => {
    fetchTransaction()
  }, [fetchTransaction])
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransaction,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

/**
 ****** SEM USAR AXIOS **************
 * 
 const url = new URL("http://localhost:3000/transactions");

		if (query) {
			url.searchParams.set("q", query);
		}

		const response = await fetch(url);
		const data = await response.json();

		setTransactions(data);
 */

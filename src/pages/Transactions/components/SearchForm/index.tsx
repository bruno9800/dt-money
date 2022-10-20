import { MagnifyingGlassMinus } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransaction = useContextSelector(TransactionContext, (context) => {
    return context.fetchTransaction
  })
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  function handleSearchTransactions(data: SearchFormInputs) {
    fetchTransaction(data.query)
    reset()
  }
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlassMinus size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

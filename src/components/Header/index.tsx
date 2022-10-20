import { HeaderContainer, HeaderContent, NewTransacionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          {/* AsChild para o Dialog.Trigger não criar um botão a mais */}
          <Dialog.Trigger asChild>
            <NewTransacionButton>Nova transição</NewTransacionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}

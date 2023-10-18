import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { PropsStack } from 'src/@types/navigation'

interface ProfileProps {
  navigation: PropsStack
}

export function Profile({ navigation }: ProfileProps) {
  return (
    <ScrollContainer>
      <S.Container>
        <S.Title>Ops...</S.Title>
        <S.Subtitle>
          Você precisa ter uma conta para ver o seu perfil
        </S.Subtitle>
        <S.Buttons>
          <CustomButton
            text="Login"
            variant="default"
            onPress={() => navigation.navigate('Login')}
          />
          <CustomButton
            text="Cadastrar"
            variant="default"
            onPress={() => navigation.navigate('Register')}
          />
        </S.Buttons>
      </S.Container>
    </ScrollContainer>
  )
}

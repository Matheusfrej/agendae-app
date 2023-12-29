import { useNavigation } from '@react-navigation/native'
import * as S from './styles'
import { NavigationType } from 'src/@types/navigation'
import { SpinDTO } from 'src/dtos/spinDTO'

interface SpinCardProps {
  spin: SpinDTO
  title: string
  start_date?: string
  end_date?: string
  creator?: string
  background_color?: 'purple' | 'green' | 'red' | 'yellow' | 'cyan' | 'blue'
}

export function SpinCard({
  spin,
  title,
  start_date,
  end_date,
  creator,
  background_color = 'purple',
}: SpinCardProps) {
  const navigation = useNavigation<NavigationType>()

  const goToSpin = () => {
    navigation.navigate('Spin', { spin })
  }

  return (
    <S.TouchableOpacity onPress={() => goToSpin()}>
      <S.SpinCardContainer variant={background_color}>
        <S.Header>
          <S.Creator>
            {creator ? 'Criado por ' : ''}
            {creator && <S.Bold>{creator}</S.Bold>}
          </S.Creator>
          <S.Dates>
            {start_date && <S.Date>{`Início: ${start_date}`}</S.Date>}
            {end_date && <S.Date>{` Fim: ${end_date}`}</S.Date>}
          </S.Dates>
        </S.Header>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>
        </S.TitleContainer>
      </S.SpinCardContainer>
    </S.TouchableOpacity>
  )
}

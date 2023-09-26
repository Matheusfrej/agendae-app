import { useNavigation } from '@react-navigation/native'
import * as S from './styles'
import { Nav } from 'src/@types/navigation'

export type SpinCardContainerVariant =
  | 'purple'
  | 'green'
  | 'red'
  | 'yellow'
  | 'cyan'
  | 'blue'

interface SpinCardProps {
  title: string
  start_date?: string
  end_date?: string
  creator?: string
  background_color?: 'purple' | 'green' | 'red' | 'yellow' | 'cyan' | 'blue'
}

export function SpinCard({
  title,
  start_date,
  end_date,
  creator,
  background_color = 'purple',
}: SpinCardProps) {
  const navigation = useNavigation<Nav>()

  const goToSpin = () => {
    navigation.navigate('Spin')
  }

  return (
    <S.TouchableOpacity onPress={() => goToSpin()}>
      <S.SpinCardContainer variant={background_color}>
        <S.Header>
          <S.Creator>
            {creator ? `Criado por ` : ''}
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

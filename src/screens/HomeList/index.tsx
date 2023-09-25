import { useState } from 'react'
import * as S from './styles'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

export function HomeList() {
  const [hasNotifications, setHasNotifications] = useState<boolean>(true)
  const [pastSpinsOpen, setPastSpinsOpen] = useState<boolean>(false)
  const [closestSpinsOpen, setClosestSpinsOpen] = useState<boolean>(false)
  const [allSpinsOpen, setAllSpinsOpen] = useState<boolean>(false)
  const theme = useTheme()

  return (
    <S.ScrollContainer>
      <S.Container>
        <S.NotificationContainer
          onPress={() => setHasNotifications(!hasNotifications)}
        >
          {hasNotifications ? (
            <FontAwesome
              name="envelope"
              size={24}
              color={theme.COLORS.PURPLE_500}
            />
          ) : (
            <FontAwesome
              name="envelope-o"
              size={24}
              color={theme.COLORS.GRAY_300}
            />
          )}
        </S.NotificationContainer>

        <S.Content>
          <S.Section onPress={() => setPastSpinsOpen(!pastSpinsOpen)}>
            {!pastSpinsOpen ? (
              <MaterialIcons
                name="arrow-right"
                size={32}
                color={theme.COLORS.PURPLE_500}
              />
            ) : (
              <MaterialIcons
                name="arrow-drop-down"
                size={32}
                color={theme.COLORS.PURPLE_500}
              />
            )}

            <S.Texts>
              <S.Title>
                <S.Span>Rolês</S.Span> anteriores
              </S.Title>
              <S.Subtitle>rolês que já terminaram</S.Subtitle>
            </S.Texts>
          </S.Section>
          <S.Section onPress={() => setClosestSpinsOpen(!closestSpinsOpen)}>
            {!closestSpinsOpen ? (
              <MaterialIcons
                name="arrow-right"
                size={32}
                color={theme.COLORS.PURPLE_500}
              />
            ) : (
              <MaterialIcons
                name="arrow-drop-down"
                size={32}
                color={theme.COLORS.PURPLE_500}
              />
            )}
            <S.Texts>
              <S.Title>
                <S.Span>Rolês</S.Span> mais próximos
              </S.Title>
              <S.Subtitle>rolês marcados para os próximos 7 dias</S.Subtitle>
            </S.Texts>
          </S.Section>
          <S.Section onPress={() => setAllSpinsOpen(!allSpinsOpen)}>
            {!allSpinsOpen ? (
              <MaterialIcons
                name="arrow-right"
                size={32}
                color={theme.COLORS.PURPLE_500}
              />
            ) : (
              <MaterialIcons
                name="arrow-drop-down"
                size={32}
                color={theme.COLORS.PURPLE_500}
              />
            )}
            <S.Texts>
              <S.Title>
                Todos os seus <S.Span>rolês</S.Span>
              </S.Title>
              <S.Subtitle>todos os seus rolês, ordenados pela data</S.Subtitle>
            </S.Texts>
          </S.Section>
        </S.Content>
      </S.Container>
    </S.ScrollContainer>
  )
}

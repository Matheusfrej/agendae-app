import { Entypo } from '@expo/vector-icons'
import * as S from './styles'
import { useState } from 'react'
import { useTheme } from 'styled-components'

interface Action {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
  color?: string
}

interface PopupMenuProps {
  actions: Action[]
}

export function PopupMenu({ actions }: PopupMenuProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const theme = useTheme()

  return (
    <>
      <S.PopupMenuContainer
        onPress={() => setIsModalOpen(!isModalOpen)}
        underlayColor={theme.COLORS.GRAY_300}
      >
        <>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </>
      </S.PopupMenuContainer>
      {isModalOpen && (
        <S.ModelView>
          {actions.map((action) => {
            return (
              <S.ActionTouchable
                key={action.name}
                underlayColor={theme.COLORS.GRAY_300}
                onPress={() => action.action()}
              >
                <S.ActionText color={action.color}>{action.name}</S.ActionText>
              </S.ActionTouchable>
            )
          })}
        </S.ModelView>
      )}
    </>
  )
}

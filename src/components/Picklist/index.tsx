import { ItemCard } from '@components/ItemCard'
import { UserDTO } from '../../dtos/userDTO'
import { useState } from 'react'
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'
import * as S from './styles'
import { getUserSocialName } from '@utils/format'

interface PicklistProps {
  name: string
  availableItems: UserDTO[]
  selectedItems: UserDTO[]
  moveToSelected: (item: UserDTO) => void
  moveToAvailable: (item: UserDTO) => void
}

export function Picklist({
  name,
  availableItems,
  selectedItems,
  moveToSelected,
  moveToAvailable,
}: PicklistProps) {
  const [availableQuery, setAvailableQuery] = useState('')
  const [selectedQuery, setSelectedQuery] = useState('')

  const availableQuantity = availableItems.length
  const selectedQuantity = selectedItems.length

  const availableItemsFiltered = availableItems.filter((el) =>
    getUserSocialName(el)
      .toString()
      .toLowerCase()
      .includes(availableQuery.toLowerCase().trim()),
  )

  const selectedItemsFiltered = selectedItems.filter((el) =>
    getUserSocialName(el)
      .toString()
      .toLowerCase()
      .includes(selectedQuery.toLowerCase().trim()),
  )

  return (
    <S.PicklistContainer>
      <S.Card>
        <S.CardHeader>
          <S.TitleContainer>
            <S.Title>
              {name} disponíveis ({availableQuantity})
            </S.Title>
          </S.TitleContainer>
          <S.Search
            placeholder="Pesquisar"
            value={availableQuery}
            onChangeText={setAvailableQuery}
          />
        </S.CardHeader>
        <GestureHandlerScrollView style={{ height: 220 }}>
          {availableItemsFiltered.map((available, idx) => {
            return (
              <ItemCard
                key={available.id + idx}
                user={available}
                onPress={() => moveToSelected(available)}
              />
            )
          })}
        </GestureHandlerScrollView>
      </S.Card>
      <S.Card>
        <S.CardHeader>
          <S.TitleContainer>
            <S.Title>
              {name} selecionados ({selectedQuantity})
            </S.Title>
          </S.TitleContainer>
          <S.Search
            placeholder="Pesquisar"
            value={selectedQuery}
            onChangeText={setSelectedQuery}
          />
        </S.CardHeader>
        <GestureHandlerScrollView style={{ height: 220 }}>
          {selectedItemsFiltered.map((selected, idx) => {
            return (
              <ItemCard
                key={selected.id + idx}
                user={selected}
                onPress={() => moveToAvailable(selected)}
              />
            )
          })}
        </GestureHandlerScrollView>
      </S.Card>
    </S.PicklistContainer>
  )
}

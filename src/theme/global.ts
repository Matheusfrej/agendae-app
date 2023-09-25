import styled from 'styled-components/native'

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`

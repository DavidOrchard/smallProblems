import React from 'react'
import { render } from '@testing-library/react'

import { Widget } from './Widget'

describe('Widget component', () => {
  it('should render', () => {
    const { asFragment, getByText } = render(<Widget />)

    expect(asFragment()).toMatchSnapshot()
    expect(getByText('my widget')).toBeTruthy()
  })
})
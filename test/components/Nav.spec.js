import {expect, assert} from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import Nav from '../../app/components/Nav'

const listItems = []

describe('<Nav />', () => {
    it('should render correct list items', () => {
        const wrapper = shallow(<Nav listItems={ listItems }  />)
        expect(wrapper.find('li')).to.have.length(4)
    })
})

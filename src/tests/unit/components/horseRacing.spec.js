import RacingBoard from '@/components/RacingBoard'
import { createLocalVue, mount } from '@vue/test-utils'
import expect from 'expect'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'
import { raceData } from '../testData'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('Component: RacingBoard', () => {
  let store
  let actions

  beforeEach(() => {
    actions = {
      fetchRaces: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('dispatches the correct store action', () => {
    const wrapper = mount(RacingBoard, {
      store,
      localVue
    })
    expect(actions.fetchRaces).toHaveBeenCalled()
  })

  it('displays correct label and button text', () => {
    const wrapper = mount(RacingBoard, {
      store,
      localVue
    })
    const header = wrapper.find('.header')
    expect(header.text()).toContain('Race Board')
    const label = wrapper.find('.label')
    expect(label.text()).toContain('Select the category')
    const greyhoundButton = wrapper.find('.greyhoundRacing')
    expect(greyhoundButton.text()).toContain('Greyhound racing')
    const harnessButton = wrapper.find('.harnessRacing')
    expect(harnessButton.text()).toContain('Harness racing')
    const horseButton = wrapper.find('.RacingBoard')
    expect(horseButton.text()).toContain('Horse racing')
    const viewLabel = wrapper.find('.view-label')
    expect(viewLabel.text()).toContain(
      'You are currently viewing greyhound racing'
    )
  })

  it('displays matches in correct order', async () => {
    const wrapper = mount(RacingBoard, {
      store,
      computed: {
        raceData: () => raceData
      },
      localVue
    })
    await wrapper.setData({ currentTimeInSeconds: 163550000.0 })
    const getTableColumn = (columnNumber = 0) => {
      const tableRows = wrapper.findAll('tbody > tr').wrappers
      const tableColumn = tableRows.map(row => {
        return row
          .findAll('td')
          .at(columnNumber)
          .text()
      })
      return tableColumn
    }
    await wrapper.find('.greyhoundRacing').trigger('click')
    let firstColumn = getTableColumn()
    expect(firstColumn).toStrictEqual([
      'The Gardens',
      'Romford Bags',
      'Newcastle Bags',
      'Cannington'
    ])
    await wrapper.find('.harnessRacing').trigger('click')
    firstColumn = getTableColumn()
    expect(firstColumn).toStrictEqual(['Melton', 'Globe Derby', 'Northam'])
    await wrapper.find('.RacingBoard').trigger('click')
    firstColumn = getTableColumn()
    expect(firstColumn).toStrictEqual(['Pune', 'Nantes', 'Turffontein'])
  })

  it('display correct count down timer', async () => {
    const wrapper = mount(RacingBoard, {
      store,
      computed: {
        raceData: () => raceData
      },
      localVue
    })
    await wrapper.setData({ currentTimeInSeconds: 1635592530.0 })
    const getTableColumn = (columnNumber = 0) => {
      const tableRows = wrapper.findAll('tbody > tr').wrappers
      const tableColumn = tableRows.map(row => {
        return row
          .findAll('td')
          .at(columnNumber)
          .text()
      })
      return tableColumn
    }
    await wrapper.find('.greyhoundRacing').trigger('click')
    const thirdColumn = getTableColumn(2)
    expect(thirdColumn).toStrictEqual([
      'Already started for 30 seconds',
      '00:00:30',
      '00:05:30',
      '00:06:30'
    ])
  })

  it('hides match which already started for one minute', async () => {
    const wrapper = mount(RacingBoard, {
      store,
      computed: {
        raceData: () => raceData
      },
      localVue
    })
    await wrapper.setData({ currentTimeInSeconds: 1635592560.0 })
    const getTableColumn = (columnNumber = 0) => {
      const tableRows = wrapper.findAll('tbody > tr').wrappers
      const tableColumn = tableRows.map(row => {
        return row
          .findAll('td')
          .at(columnNumber)
          .text()
      })
      return tableColumn
    }
    await wrapper.find('.greyhoundRacing').trigger('click')
    const firstColumn = getTableColumn()
    expect(firstColumn).toStrictEqual([
      'Romford Bags',
      'Newcastle Bags',
      'Cannington'
    ])
  })
})

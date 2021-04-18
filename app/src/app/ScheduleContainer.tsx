import React, {
  useEffect,
  useState,
} from 'react'
import { getWeek } from 'date-fns'
import styled from 'styled-components'

import type {
  WeekOptions,
  WeekSchedule,
} from '../types'

import { getSchedule } from './services/api'
import UiSpoiler from './components/UiSpoiler'
import UiMatchGroup from './components/UiMatchGroup'
import UiNavigation from './components/UiNavigation'
import { getQueryParam } from './services/utils'

const OWL_STARTED_WEEK = 15
const WEEK_START_ON_TUESDAY: WeekOptions = {weekStartsOn: 2}

const WeekTitle = styled.h2`
  display: flex;
  justify-content: space-between;
`

const ScheduleWrapper = styled.div`
  width: fit-content;
  margin: auto auto 100px;
`

const Refresh = styled.span`
  cursor: pointer;
  content: 'toto;
`

const ScheduleContainer = () => {
  const [ loading, setLoading ] = useState(false)
  const [ schedule, setSchedule ] = useState<WeekSchedule | undefined>()
  const [ spoiler, setSpoiler ] = useState(false)

  const loadSchedule = async () => {
    setLoading(true)

    try {
      const response = await getSchedule(week)

      setSchedule(response)

      console.log('schedule', schedule)
    } catch (error) {
      console.error('ERROR', error)
    }

    setLoading(false)
  }

  const getSelectedWeek = () => {
    const week = getQueryParam('week')

    if (week) {
      return parseInt(week, 10)
    }

    return getWeek(new Date(), WEEK_START_ON_TUESDAY) - OWL_STARTED_WEEK
  }

  const [ week, setWeek ] = useState(getSelectedWeek())

  const onPrevious = () => {
    const previousWeek = week - 1
    setWeek(previousWeek)
  }

  const onNext = () => {
    const nextWeek = week + 1
    setWeek(nextWeek)
  }

  useEffect(() => {
    loadSchedule()
    history.pushState({}, '', `/?week=${week}`)
  }, [ week ])

  return (
    <ScheduleWrapper>
      {loading && <progress/>}

      {!schedule ? (
        <p>No data</p>
      ) : (
        <div>
          <WeekTitle>
            {schedule.name}
            <Refresh onClick={loadSchedule}>🔄</Refresh>
            <UiSpoiler show={spoiler} onChange={setSpoiler}/>
          </WeekTitle>

          <UiMatchGroup matches={schedule.matches} spoiler={spoiler}/>
        </div>
      )}

      <UiNavigation
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </ScheduleWrapper>
  )
}

export default ScheduleContainer

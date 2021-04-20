import React, {
  useEffect,
  useState,
} from 'react'
import { getWeek } from 'date-fns'
import styled, { css } from 'styled-components'
import { Cached } from '@material-ui/icons'

import type {
  WeekOptions,
  WeekSchedule,
} from '../types'

import { getSchedule } from './services/api'
import UiSpoiler from './components/UiSpoiler'
import UiMatchGroup from './components/UiMatchGroup'
import UiNavigation from './components/UiNavigation'
import { getQueryParam } from './services/utils'
import {
  breakpoint,
  secondaryColor,
} from './design/common'

const OWL_STARTED_WEEK = 15
const WEEK_START_ON_TUESDAY: WeekOptions = { weekStartsOn: 2 }

const WeekTitle = styled.h2`
  display: flex;
  align-items: center;
`

const ScheduleWrapper = styled.div`
  margin: 0 auto;
  width: calc(100% - 10px);

  @media screen and (min-width: ${breakpoint}px) {
    width: 700px;
  }
`

const Refresh = styled(Cached)<{ $loading: boolean }>`
  cursor: pointer;
  margin-left: 12px;
  color: ${secondaryColor};

  ${({ $loading }) => $loading && css`
    animation: Spinner infinite 1s linear;
  `}

  @keyframes Spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const Spoiler = styled(UiSpoiler)`
  margin-left: auto;
`

const ScheduleContainer = () => {
  const [loading, setLoading] = useState(false)
  const [schedule, setSchedule] = useState<WeekSchedule | undefined>()
  const [spoiler, setSpoiler] = useState(false)

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

  const [week, setWeek] = useState(getSelectedWeek())

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
    history.pushState({}, ``, `/?week=${week}`)
  }, [week])

  return (
    <ScheduleWrapper>
      {!schedule ? (
        <>
          {loading && <progress/>}
          <p>No data</p>
        </>
      ) : (
        <div>
          <WeekTitle>
            {schedule.name}
            <Refresh onClick={loadSchedule} $loading={loading}/>
            <Spoiler show={spoiler} onChange={setSpoiler}/>
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

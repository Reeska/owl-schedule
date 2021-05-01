import React, {
  useEffect,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import { Cached } from '@material-ui/icons'
import { LinearProgress } from '@material-ui/core'

import type { WeekSchedule } from '../../types/types'
import {
  onDesktop,
  secondaryColor,
} from '../common/design/common'

import { getSchedule } from './services/api'
import {
  getCurrentWeek,
  getQueryParam,
} from './services/match.utils'
import UiSpoiler from './components/UiSpoiler'
import UiMatchGroup from './components/UiMatchGroup'
import UiNavigation from './components/UiNavigation'

const WeekTitle = styled.h2`
  display: flex;
  align-items: center;
`

const ScheduleWrapper = styled.div`
  margin: 0 auto;
  width: calc(100% - 10px);

  ${onDesktop(`
    max-width: 700px;
  `)}
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

const LinearLoader = styled(LinearProgress)`
  && {
    background-color: transparent;
  }

  .MuiLinearProgress-bar {
    background-color: ${secondaryColor};
  }
`

const ScheduleContainer = () => {
  const [loading, setLoading] = useState(false)
  const [schedule, setSchedule] = useState<WeekSchedule | undefined>()
  const [spoiler, setSpoiler] = useState(false)
  const currentWeek = getCurrentWeek()

  const loadSchedule = async () => {
    setLoading(true)

    try {
      const response = await getSchedule(week)

      setSchedule(response)
    } catch (error) {
      console.error('ERROR', error)
    }

    setLoading(false)
  }

  const getSelectedWeek = () => {
    const week = getQueryParam('week')

    return week ? parseInt(week, 10) : currentWeek
  }

  const [week, setWeek] = useState(getSelectedWeek)

  const onPrevious = () => setWeek(week - 1)

  const onNext = () => setWeek(week + 1)

  useEffect(() => {
    const url = currentWeek === week ? '/' : `/?week=${week}`

    history.pushState({}, ``, url)
    loadSchedule()
  }, [week])

  return (
    <ScheduleWrapper>
      {!schedule ? (
        <>
          {loading ? (
            <LinearLoader/>
          ) : (
            <p>No data</p>
          )}
        </>
      ) : (
        <>
          <div>
            <WeekTitle>
              {schedule.name}
              <Refresh onClick={loadSchedule} $loading={loading}/>
              <Spoiler show={spoiler} onChange={setSpoiler}/>
            </WeekTitle>

            <UiMatchGroup matches={schedule.matches} spoiler={spoiler}/>
          </div>

          <UiNavigation
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </>
      )}
    </ScheduleWrapper>
  )
}

export default ScheduleContainer

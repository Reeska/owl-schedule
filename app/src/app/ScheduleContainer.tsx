import React, {
  useEffect,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import {
  Cached,
  Error,
} from '@material-ui/icons'
import {
  LinearProgress,
  Tooltip,
} from '@material-ui/core'
import { useSwipeable } from 'react-swipeable'

import {
  onDesktop,
  secondaryColor,
} from '../common/design/common'
import UiSpoiler from './components/UiSpoiler'
import UiMatchGroup from './components/UiMatchGroup'
import UiNavigation from './components/UiNavigation'
import UiNoMatch from './components/UiNoMatch'
import { useSchedule } from './services/api'
import { getCurrentWeek } from './utils/match.utils'
import { getQueryParamInteger } from './utils/url.utils'

const WeekTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ScheduleWrapper = styled.div<{ swipeMargin?: number }>`
  margin: 0 auto;
  width: calc(100% - 10px);
  left: ${({ swipeMargin }) => swipeMargin ?? 0}px;

  ${onDesktop(`
    max-width: 700px;
  `)}
`

const Refresh = styled(Cached)<{ $loading: boolean }>`
  cursor: pointer;
  color: ${secondaryColor};

  ${({ $loading }) => $loading && css`
    animation: Spinner infinite 1s linear;
  `} @keyframes Spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const ErrorReport = styled(Error)`
  color: #282d33;
  background: ${secondaryColor};
  border-radius: 50%;
`

const LinearLoader = styled(LinearProgress)`
  && {
    background-color: transparent;
  }

  .MuiLinearProgress-bar {
    background-color: ${secondaryColor};
  }
`

const Options = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;
`

const WeekSchedule = styled.div<{ swipeMargin?: number }>``

const ScheduleContainer = () => {
  const currentWeek = getCurrentWeek()
  const [ spoiler, setSpoiler ] = useState(false)
  const [ showStatus, setShowStatus ] = useState(false)
  const [ week, setWeek ] = useState(getQueryParamInteger('week') ?? currentWeek)
  const { data, isFetching, refetch, error } = useSchedule(week)

  const onPrevious = () => setWeek(week - 1)
  const onNext = () => setWeek(week + 1)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrevious,
    trackMouse: true,
    rotationAngle: 30,
  })

  useEffect(() => {
    const url = currentWeek === week ? '/' : `/?week=${week}`

    history.pushState({}, ``, url)
  }, [ week ])

  return (
    <ScheduleWrapper {...swipeHandlers}>
      {!data ? (
        <>
          {isFetching ? (
            <LinearLoader/>
          ) : (
            <p>No data</p>
          )}
        </>
      ) : (
        <>
          <WeekSchedule>
            <WeekTitle>
              {data.name}

              <Refresh onClick={() => refetch()} $loading={isFetching}/>

              {error && (
                <Tooltip title="Oops! An error occurred." arrow>
                  <ErrorReport/>
                </Tooltip>
              )}

              <Options>
                <UiSpoiler show={showStatus} onChange={setShowStatus}>
                  Status
                </UiSpoiler>

                <UiSpoiler show={spoiler} onChange={setSpoiler}>
                  Score
                </UiSpoiler>
              </Options>
            </WeekTitle>

            {data.matches.length === 0 ? (
              <UiNoMatch/>
            ) : (
              <UiMatchGroup
                matches={data.matches}
                spoiler={spoiler}
                showStatus={showStatus}
              />
            )}
          </WeekSchedule>

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

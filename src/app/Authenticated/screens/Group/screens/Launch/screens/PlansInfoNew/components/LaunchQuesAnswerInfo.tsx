import React, { FC, useEffect } from 'react';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import {
  Grid,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { getPlansQuestionsAndAnswersDiffData } from 'app/api-urls';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import { makeStyles } from '@material-ui/core/styles';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';
import { InfoItem } from './LaunchEligibilityRules';

export type LaunchPlanQuesAnsInfoItem = {
  question: string;
  answer: string;
  compareStatus: InfoItem;
};

export type QuestionsAndAnswersApiResponse = {
  planId: number;
  questions: Array<LaunchPlanQuesAnsInfoItem>;
};

const initialState: QuestionsAndAnswersApiResponse = {
  planId: 0,
  questions: [],
};
const useStyles = makeStyles((theme) => ({
  referentialData: {
    fontStyle: 'italic',
    color: '#72757e',
    fontWeight: 'normal!important' as any,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    '&$hover:hover': {
      backgroundColor: theme.palette.warning.main,
    },
  },
}));

const LaunchPlanQuesAnsTable: FC = () => {
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();

  const classes = useStyles();

  const {
    currentState: qnaCallState,
    response: planQuesAnsInfo = initialState,
    makeApiCall: makeQnACall,
  } = useApiCall({
    url: getPlansQuestionsAndAnswersDiffData(
      groupId,
      launchId,
      planId,
      packageCode
    ),
    type: 'json',
  });

  useEffect(() => {
    if (qnaCallState === FetchStates.NOT_YET_CALLED) {
      makeQnACall();
    }
  }, [qnaCallState, makeQnACall]);

  return (
    <>
      {qnaCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {qnaCallState !== FetchStates.PENDING &&
        qnaCallState !== FetchStates.ERROR && (
          <Grid container direction="column">
            <SectionHeaderContainer header="Questions and Answers" />
            <ListItemGrid>
              <Grid item xs={10}>
                <Box pb={3} />
                <div>
                  <TableContainer
                    component={Paper}
                    className={classes.referentialData}
                  >
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Question</TableCell>
                          <TableCell>Answer</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {planQuesAnsInfo &&
                          planQuesAnsInfo?.questions?.map((p: any) => {
                            return (
                              <TableRow>
                                <TableCell>{p.question}</TableCell>
                                <TableCell
                                  className={
                                    p?.compareStatus?.compareStatus ===
                                    'NOT_EQUAL'
                                      ? classes.warning
                                      : ''
                                  }
                                >
                                  {p.answer}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </ListItemGrid>
          </Grid>
        )}
    </>
  );
};

export default LaunchPlanQuesAnsTable;

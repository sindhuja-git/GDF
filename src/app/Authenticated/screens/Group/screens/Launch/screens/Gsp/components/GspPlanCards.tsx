import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  govtPlansPresentSelector,
  cdhpPlansPresentSelector,
  selectHWBPlanGdfId,
} from 'app/Ducks/PlanSummary/selectors';
import NonMemberParticipantsInfoCard from './NonMemberParticipantsInfoCard';
import PlanTypePresentCard from './PlanTypePresentCard';

const GspPlanCards: FC = () => {
  const govtPlansPresent = useSelector(govtPlansPresentSelector);
  const cdhpPlansPresent = useSelector(cdhpPlansPresentSelector);
  const selectedHwbPlanId = useSelector(selectHWBPlanGdfId);
  return (
    <>
      <PlanTypePresentCard
        planTypePresent={govtPlansPresent}
        cardHeader="Government Programs"
        planTypeName="Government Program"
      />
      <PlanTypePresentCard
        planTypePresent={cdhpPlansPresent}
        cardHeader="CDHP"
        planTypeName="CDHP"
      />
      <NonMemberParticipantsInfoCard
        title="Health & Well-Being Solutions"
        planId={selectedHwbPlanId}
        load={selectedHwbPlanId === null}
      />
    </>
  );
};

export default GspPlanCards;

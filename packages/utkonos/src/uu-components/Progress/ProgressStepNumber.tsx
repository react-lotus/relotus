import React from 'react';

/**
 * Возвращает компонент с иконкой шага
 *
 * @export
 * @param {number} step
 * @returns
 */
export function stepNumber(step: number) {
  function ProgressStepNumber() {
    return <div className="uu-progress__stepNumber">{step}</div>;
  }
  ProgressStepNumber.large_icon = true;
  return ProgressStepNumber;
}

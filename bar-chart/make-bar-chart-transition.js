function makeBarChartTransition(previousState, currentState) {
    if (previousState === null) {
        return makeEnterTransition(currentState);
    } else if (previousState.context.genre == currentState.context.genre) {
        makeDirectTransition(currentState);
    } else {
        return makeExitTransition(previousState).then(() => makeEnterTransition(currentState));
    }
}

// https://statecharts.github.io/xstate-viz/

const onboardingFlow = Machine(
  {
    initial: "loading",
    context: {
      isBusinessOwner: true,
      events: []
    },
    states: {
      loading: {
        on: {
          LOAD_ONBOARDING_INFO: {
            target: "onboardingNeeded",
            actions: ["setOnboardingContext"]
          }
        }
      },
      onboardingNeeded: {
        initial: "accountSetup",
        onDone: "onboardingCompleted",
        states: {
          accountSetup: {
            on: {
              "": [{ target: "accountAltEmail", cond: "passwordAlreadySet" }],
              ADVANCE: "accountAltEmail",
              ON_ERROR: "errored"
            }
          },
          accountAltEmail: {
            on: {
              "": [{ target: "accountSSN", cond: "altEmailSet" }],
              ADVANCE: "accountSSN",
              ON_ERROR: "errored"
            }
          },
          accountSSN: {
            on: {
              "": [
                { target: "accountEIN", cond: "isBusinessOwnerAndSsnSet" },
                { target: "accountAccept", cond: "ssnSet" }
              ],
              ADVANCE: "accountEIN",
              ON_ERROR: "errored"
            }
          },
          accountEIN: {
            on: {
              "": [{ target: "accountAccept", cond: "einSet" }],
              ADVANCE: "accountAccept",
              ON_ERROR: "errored"
            }
          },
          accountAccept: {
            on: {
              "": [{ target: "accountCreated", cond: "tocSet" }],
              ADVANCE: "accountCreated",
              ON_ERROR: "errored"
            }
          },
          errored: {
            on: {
              RETRY: "accountSetup"
            }
          },
          accountCreated: {
            type: "final"
          }
        }
      },
      onboardingCompleted: {
        type: "final"
      }
    }
  },
  {
    guards: {
      passwordAlreadySet: context => {
        const actionsNeeded =
          context.events.includes("CHANGE_PW") ||
          context.events.includes("FIRST_TIME_LOGIN");

        return !actionsNeeded;
      },
      altEmailSet: context => {
        const actionsNeeded =
          context.events.includes("ADD_ALT_EMAIL") ||
          context.events.includes("UPDATE_ALT_EMAIL");

        return !actionsNeeded;
      },
      ssnSet: context => {
        const actionsNeeded = context.events.includes("ADD_SSN");

        return !actionsNeeded;
      },
      isBusinessOwner: context => context.isBusinessOwner,
      isBusinessOwnerAndSsnSet: context => {
        const actionsNeeded = context.events.includes("ADD_SSN");

        return !actionsNeeded && context.isBusinessOwner;
      },
      einSet: context => {
        const actionsNeeded = context.events.includes("ADD_EIN");

        return !actionsNeeded;
      },
      tocSet: context => {
        const actionsNeeded = context.events.includes("TERMS_AND_CONDITIONS");

        return !actionsNeeded;
      }
    },
    actions: {
      setOnboardingContext: assign((context, event) => {
        return {
          ...context,
          events: event.events,
          isBusinessOwner: event.isBusinessOwner
        };
      })
    }
  }
);

// user who's already done:
const userAlreadyOnboardedEvent = {
  type: "LOAD_ONBOARDING_INFO",
  events: [],
  isBusinessOwner: false
};

// Still needs to set EIN
const stillNeedsToSetEINEvent = {
  type: "LOAD_ONBOARDING_INFO",
  events: ["ADD_EIN"],
  isBusinessOwner: true
};

// Still needs to accept toc:
const stillNeedsToAcceptTOC = {
  type: "LOAD_ONBOARDING_INFO",
  events: ["TERMS_AND_CONDITIONS"],
  isBusinessOwner: false
};

// still needs to do everything!
const stillNeedsToDoEverythingEvent = {
  type: "LOAD_ONBOARDING_INFO",
  events: [
    "CHANGE_PW",
    "FIRST_TIME_LOGIN",
    "ADD_ALT_EMAIL",
    "UPDATE_ALT_EMAIL",
    "ADD_SSN",
    "ADD_EIN",
    "TERMS_AND_CONDITIONS"
  ],
  isBusinessOwner: true
};

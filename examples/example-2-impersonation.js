const impersonateMachine = Machine(
  {
    id: "impersonate",
    initial: "notImpersonating",
    context: {
      trueUserId: 1,
      impersonatedUserId: null
    },
    states: {
      notImpersonating: {
        on: {
          VIEW_AS_USER: {
            target: "viewAs",
            actions: ["setImpersonatedUser"]
          },
          MANAGE_BUDGETS_AS_USER: {
            target: "manageBudgets",
            actions: ["setImpersonatedUser"]
          }
        }
      },
      viewAs: {
        on: {
          STOP_IMPERSONATING: {
            target: "notImpersonating",
            actions: ["clearImpersonatedUser"]
          }
        }
      },
      manageBudgets: {
        on: {
          STOP_IMPERSONATING: {
            target: "notImpersonating",
            actions: ["clearImpersonatedUser"]
          }
        }
      }
    }
  },
  {
    actions: {
      setImpersonatedUser: (context, event) => {
        return {
          ...context,
          impersonatedUserId: event.impersonatedUserId
        };
      },
      clearImpersonatedUser: context => {
        return {
          ...context,
          impersonatedUserId: null
        };
      }
    }
  }
);

// viewAsUserEvent
const viewAsUserEvent = {
  type: "VIEW_AS_USER",
  impersonatedUserId: 2
};

// manageBudgetsAsUserEvent
const manageBudgetsAsUserEvent = {
  type: "MANAGE_BUDGETS_AS_USER",
  impersonatedUserId: 2
};

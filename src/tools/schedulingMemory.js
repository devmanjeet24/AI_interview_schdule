let state = {}

export function getState(userId){

 if(!state[userId]){
  state[userId] = {}
 }

 return state[userId]

}

export function updateState(userId,data){

 state[userId] = {
  ...state[userId],
  ...data
 }

}

export function clearState(userId){

 delete state[userId]

}
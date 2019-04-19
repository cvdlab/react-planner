import { SELECT_TOOL_3D_VIEW, SELECT_TOOL_3D_FIRST_PERSON, SCENE_3D_HAS_BEEN_CREATED } from '../constants'

export function selectTool3DView () {
  return {
    type: SELECT_TOOL_3D_VIEW
  }
}

export function selectTool3DFirstPerson () {
  return {
    type: SELECT_TOOL_3D_FIRST_PERSON
  }
}

export function scene3DHasBeenCreated () {
  return {
    type: SCENE_3D_HAS_BEEN_CREATED

  }
}



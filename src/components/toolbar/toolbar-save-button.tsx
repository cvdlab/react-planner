import React from "react";
import { FaSave as IconSave } from "react-icons/fa";
import { Project } from "../../class/export";
import { browserDownload } from "../../utils/browser";
import ToolbarButton from "./toolbar-button";

type Props = { state: any; translator: any };

export default function ToolbarSaveButton({ state, translator }: Props) {
  let saveProjectToFile = (e: any) => {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    browserDownload(state.get("scene").toJS());
  };

  return (
    <ToolbarButton
      active={false}
      tooltip={translator.t("Save project")}
      onClick={saveProjectToFile}
    >
      <IconSave />
    </ToolbarButton>
  );
}


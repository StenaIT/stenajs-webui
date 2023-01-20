import { faJediOrder } from "@fortawesome/free-brands-svg-icons/faJediOrder";
import { Column, Text, Space } from "@stenajs-webui/core";
import * as React from "react";
import { ButtonSize } from "../common/ButtonCommon";
import { InputFieldButton } from "./InputFieldButton";

const buttonSizes: Array<ButtonSize> = ["small", "medium", "large"];

export default {
  title: "elements/Buttons/InputFieldButton",
};

export const Standard = () => (
  <Column spacing indent>
    <Text size={"large"}>InputFieldButton icons</Text>
    <Space num={4} />
    <div style={{ display: "inline-block" }}>
      {buttonSizes.map((size) => (
        <>
          <InputFieldButton
            key={size}
            icon={faJediOrder}
            onClick={() => {
              alert("woop woop");
            }}
          />
          <Space key={size + "1"} />
        </>
      ))}
    </div>
  </Column>
);

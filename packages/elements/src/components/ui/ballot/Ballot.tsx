import * as React from "react";
import { ReactNode, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Column, Heading, Row, Txt } from "@stenajs-webui/core";

import { Icon } from "../icon/Icon";
import styles from "./Ballot.module.css";
import cx from "classnames";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { Checkbox } from "@stenajs-webui/forms";
import { faVoteYea } from "@fortawesome/free-solid-svg-icons/faVoteYea";

export type BallotVariant = "riksdag" | "kommun" | "landsting";

export interface BallotProps {
  icon?: IconDefinition;
  categoryText: string;
  headerText: string;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  contentRight?: ReactNode;
  variant?: BallotVariant;
  candidates?: string[];
  children?: ReactNode;
  onVote: (candidate: string | null) => void;
  onSelectCandidate?: (candidate: string | null) => void;
}

export const Ballot: React.FC<BallotProps> = ({
  categoryText,
  headerText,
  text,
  children,
  icon,
  variant = "riksdag",
  loading = false,
  disabled = false,
  candidates,
  onVote,
  onSelectCandidate,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );

  return (
    <div className={cx(styles.ballot, styles[variant])}>
      <Row justifyContent={"center"}>
        <Txt variant={"overline"}>{categoryText}</Txt>
      </Row>
      <Row justifyContent={"center"} alignItems={"center"} gap={2}>
        {icon && <Icon icon={icon} size={24} className={styles.icon} />}
        <Heading variant={"h2"}>{headerText}</Heading>
      </Row>
      {text && (
        <Column spacing>
          <Txt>{text}</Txt>
        </Column>
      )}
      {candidates && (
        <Column gap>
          {candidates.map((candidate) => (
            <label>
              <Row alignItems={"center"} gap>
                <Checkbox
                  disabled={disabled}
                  onClick={() => {
                    if (selectedCandidate === candidate) {
                      setSelectedCandidate(null);
                      onSelectCandidate?.(null);
                    } else {
                      setSelectedCandidate(candidate);
                      onSelectCandidate?.(candidate);
                    }
                  }}
                  checked={selectedCandidate === candidate}
                />
                <Txt>{candidate}</Txt>
              </Row>
            </label>
          ))}
        </Column>
      )}
      <Row flex={1} alignItems={"flex-end"}>
        <PrimaryButton
          onClick={() => onVote(selectedCandidate)}
          loading={loading}
          label={"Vote"}
          loadingLabel={"Voting"}
          leftIcon={faVoteYea}
          disabled={disabled}
        />
      </Row>
      {children}
    </div>
  );
};

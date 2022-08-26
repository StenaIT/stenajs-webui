import * as React from "react";
import { ReactNode, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Column, Heading, Row, Txt } from "@stenajs-webui/core";
import styles from "./Ballot.module.css";
import cx from "classnames";
import { faVoteYea } from "@fortawesome/free-solid-svg-icons/faVoteYea";
import { Icon, PrimaryButton } from "@stenajs-webui/elements";
import { CheckboxWithLabel } from "../checkbox/CheckboxWithLabel";

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
            <CheckboxWithLabel
              label={candidate}
              checked={selectedCandidate === candidate}
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
            />
          ))}
        </Column>
      )}
      {children}
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
    </div>
  );
};

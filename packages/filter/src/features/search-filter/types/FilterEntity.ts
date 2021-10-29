import { EntityWithId } from "@stenajs-webui/redux";

export interface FilterEntity extends EntityWithId {
  name: string;
  code: string;
}

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

export interface DateStringRange {
  /**
   * Format: yyyy-MM-dd
   * Example: 2021-02-21
   */
  startDate?: string;
  /**
   * Format: yyyy-MM-dd
   * Example: 2021-02-21
   */
  endDate?: string;
}

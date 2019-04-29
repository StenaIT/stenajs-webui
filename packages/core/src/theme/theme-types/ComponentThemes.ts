import { ButtonTheme } from '../../components/ui/buttons/ButtonTheme';
import { FlatButtonTheme } from '../../components/ui/buttons/FlatButtonTheme';
import { SmallButtonTheme } from '../../components/ui/buttons/SmallButtonTheme';
import { StandardButtonTheme } from '../../components/ui/buttons/StandardButtonTheme';
import { SeparatorLineTheme } from '../../components/ui/decorations/SeparatorLineTheme';
import { TextTheme } from '../../components/ui/text/TextTheme';

export interface ComponentThemes {
  Button: ButtonTheme;
  DefaultText: TextTheme;
  FlatButton: FlatButtonTheme;
  HeaderText: TextTheme;
  LargeText: TextTheme;
  SectionHeaderText: TextTheme;
  SeparatorLine: SeparatorLineTheme;
  SmallButton: SmallButtonTheme;
  SmallText: TextTheme;
  SmallerText: TextTheme;
  StandardButton: StandardButtonTheme;
  TinyText: TextTheme;
}

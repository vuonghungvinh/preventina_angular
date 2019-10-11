export interface TabType {
  title: string;
  gearType: string;
  level?: number;
  disabled?: boolean;
  colorPicker?: boolean;
  textField?: boolean;
  format: TabFormats;
}

enum TabFormats {
  Vector,
  Raster
}

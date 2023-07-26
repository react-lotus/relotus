export interface UISlice {
  user?: {
    name: string;
  };
  title: string;
}

export interface DomainSlice {
  list: string[];
  page: number;
  total: number;
  pageSize: number;
}

export interface State {
  ui?: UISlice;
  domain: DomainSlice;
}

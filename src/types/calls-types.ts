export type TCall = {
  id: number;
  partnership_id: string;
  partner_data: {
    id: string;
    name: string;
    phone: string;
  };
  date: Date;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string;
  line_number: string;
  in_out: number;
  from_site: number;
  source: string;
  errors: [];
  disconnect_reason: string;
  results: [];
  stages: [];
  abuse: [];
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
};

export type TCalls = {
  total_rows: string;
  results: TCall[];
};

export type TFilterCalls = {
  date: string;
  calls: TCall[];
};

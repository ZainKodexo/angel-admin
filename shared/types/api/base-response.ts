type Error = {
  success: boolean;
  message: string;
};

type MongoObjectId = {
  $oid: string;
};

type MongoDate = {
  $date: string;
};

interface SuccessResponse {
  status_code: number;
  message: string;
}

interface SuccessNullResponse extends SuccessResponse {
  data: null;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

export type {
  Error,
  MongoObjectId,
  MongoDate,
  ErrorResponse,
  SuccessNullResponse,
  SuccessResponse,
};

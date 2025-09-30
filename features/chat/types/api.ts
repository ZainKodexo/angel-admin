import type {
  ErrorResponse,
  SuccessNullResponse,
  SuccessResponse,
} from '@/shared/types';

type Transcription = {
  start: number;
  end: number;
  text: string;
};

type SessionStatus = 'pause' | 'play' | 'stop';

type ChatHistory = {
  audio_data?: string;
  is_local?: boolean;
  message?: string;
  type: string;
  transcribed_text?: Transcript[];
  query_time: string;
};

type ChatData = {
  created_on: { $date: string };
  is_close: string;
  session_text: string;
  therapist_id: string;
  thread_id: string;
  user_id: string;
  _id: string;
  chat_history: ChatHistory[];
  session_status: SessionStatus;
  is_available: boolean;
  message: string;
};

type Transcript = {
  end: number;
  text: string;
  start: number;
};

type TranscribeData = {
  transcribed_text: string;
  timestamp_of_text: Transcript[];
};

type UpdateSessionRequest = {
  session_id: string;
  session_status: string;
};

type SessionFeedbackRequest = {
  session_id: string;
  session_feedback: string;
};

interface ChatHistorySuccess extends SuccessResponse {
  data: ChatData;
}

interface TranscribeAudioSuccess extends SuccessResponse {
  data: TranscribeData;
}

type ChatHistoryResponse = ChatHistorySuccess | ErrorResponse;
type TranscribeAudioResponse = TranscribeAudioSuccess | ErrorResponse;
type UpdateSessionResponse = SuccessNullResponse | ErrorResponse;
type SessionFeedbackResponse = SuccessNullResponse | ErrorResponse;

export type {
  ChatHistory,
  ChatHistoryResponse,
  TranscribeAudioResponse,
  TranscribeData,
  Transcription,
  UpdateSessionResponse,
  SessionFeedbackRequest,
  UpdateSessionRequest,
  SessionFeedbackResponse,
  SessionStatus,
  Transcript,
};

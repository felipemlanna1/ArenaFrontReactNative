import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { Event, UserEventStatus } from '@/services/events/typesEvents';

export type EventDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventDetails'
>;

export type EventDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetails'
>;

export interface EventDetailsScreenProps {
  navigation: EventDetailsScreenNavigationProp;
  route: EventDetailsScreenRouteProp;
}

export interface UserEventActions {
  onJoin: () => Promise<void>;
  onLeave: () => Promise<void>;
  onRequestJoin: () => Promise<void>;
  onCancelRequest: () => Promise<void>;
  onAcceptInvite: () => Promise<void>;
  onRejectInvite: () => Promise<void>;
  onCheckIn: () => Promise<void>;
}

export interface ManagementEventActions {
  onEdit: () => void;
  onManage: () => void;
  onCancel: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export interface ShareEventActions {
  onShare: () => Promise<void>;
}

export interface EventDetailsStatus {
  userEventStatus: UserEventStatus;
  canJoin: boolean;
  isFull: boolean;
  isOwner: boolean;
  isOrganizer: boolean;
  isParticipant: boolean;
  isPending: boolean;
  isInvited: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
  showCheckIn: boolean;
  availableSpots: number;
  spotsProgress: number;
}

export type EventActionType =
  | 'join'
  | 'request'
  | 'accept-invite'
  | 'leave'
  | 'cancel-request'
  | 'check-in'
  | 'manage'
  | 'full'
  | 'ended';
export interface EventActionButtonState {
  type: EventActionType;
  label: string;
  variant: 'primary' | 'secondary' | 'destructive' | 'success' | 'subtle' | 'ghost';
  disabled: boolean;
  loading: boolean;
  onPress: () => void | Promise<void>;
}

export interface UseEventDetailsDataReturn {
  event: Event | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export type UseEventDetailsStatusReturn = EventDetailsStatus;

export interface UseEventDetailsActionsReturn {
  userActions: UserEventActions;
  managementActions?: ManagementEventActions;
  shareActions: ShareEventActions;
  isPerformingAction: boolean;
}

export interface UseEventDetailsScreenReturn {
  event: Event | null;
  isLoading: boolean;
  error: Error | null;
  status: EventDetailsStatus;
  userActions: UserEventActions;
  managementActions?: ManagementEventActions;
  shareActions: ShareEventActions;
  actionButtonState: EventActionButtonState;
  refresh: () => Promise<void>;
  isPerformingAction: boolean;
}

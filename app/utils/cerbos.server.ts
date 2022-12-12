import { GRPC as Cerbos } from '@cerbos/grpc';

export const cerbos = new Cerbos('localhost:3593', { tls: false });

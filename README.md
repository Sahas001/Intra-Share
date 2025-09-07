# IntraShare
IntraShare is a suite of collaboration modules that run on local devices
(desktop/server) and form a peer mesh for discovery and sync. It aims to
be resilient to internet disruptions, privacy-preserving (LAN-first,
optional hosted bridge), and extensible into enterprise self-hosted
deployments

## Key Points
1.  Each device runs a **LocalNode** process (Go) exposing:
    -   Local HTTP API (REST) for frontend.
    -   gRPC internal API for modules.
    -   libp2p transport for peer-to-peer replication.
    -   Storage layer (Badger/SQLite) + local file storage path.
2.  **Discovery:** mDNS locates peers on LAN. When WAN needed, nodes
    optionally register to a Rendezvous/Bootstrap server.
3.  **Sync Engine:** Module-agnostic sync: each module exposes a log of
    changes (append-only), with CRDT merge logic. The sync engine
    reconciles logs across peers.
4.  **Frontend clients** connect to local HTTP API; UI mirrors local
    state and subscribes to websocket events.

---------------------------------------------------------------------------

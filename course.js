const curriculum=[
{name:'Foundations',color:'#c9a56b',lessons:[
['How a Request Travels','Follow one API call from the client to the database and back.','Client sends a method, path, headers, and optional body.','An edge gateway routes traffic to the application.','The application reads data and returns a status with JSON.','GET /api/orders/42'],
['Latency & Throughput','Learn the two numbers that shape performance.','Latency is the time one request takes to finish.','Throughput is how many requests a system completes per second.','Queues grow when arrival rate exceeds service capacity.','p95 = 180 ms · 2,000 req/s'],
['Back-of-the-Envelope Math','Estimate capacity before reaching for infrastructure.','Start with users, actions per user, and peak multiplier.','Convert requests into bandwidth, storage, and compute.','Round assumptions and check orders of magnitude.','100k users × 20 reads/day ≈ 23 reads/s']
]},
{name:'Scaling',color:'#4fa46c',lessons:[
['Vertical vs Horizontal Scaling','Choose between a bigger machine and more machines.','Vertical scaling adds CPU or memory to one server.','Horizontal scaling adds servers behind a router.','Horizontal scale needs coordination and shared state.','1 × 32 cores vs 4 × 8 cores'],
['Load Balancing','Spread traffic across healthy application instances.','A load balancer receives traffic at one stable address.','Health checks remove unhealthy targets from rotation.','Algorithms such as round robin and least connections distribute work.','client → balancer → app-1 | app-2'],
['Stateless Services','Make requests independent of a particular server.','A stateless instance does not keep user session data locally.','Shared stores or signed tokens carry state across instances.','Any healthy instance can handle the next request.','session → shared store'],
['Caching','Trade freshness for faster repeated reads.','Check a fast cache before running expensive work.','On a miss, fetch the source and populate the cache.','Set a TTL or invalidate entries when data changes.','cache.get("product:42")'],
['Content Delivery Networks','Move static content close to users.','A CDN caches assets at edge locations around the world.','A cache hit avoids a long round trip to the origin.','Versioned asset URLs make updates safe.','/assets/app.a1b2.js → edge cache']
]},
{name:'Data & Storage',color:'#8c69c0',lessons:[
['SQL vs NoSQL','Match data shape and query needs to a storage model.','Relational tables offer joins and strong constraints.','Document stores keep related fields together in flexible records.','Choose from access patterns, consistency, and operations.','SELECT * FROM orders WHERE id = 42'],
['Database Indexes','Find a row without scanning an entire table.','An index stores searchable keys with row locations.','A lookup narrows the search to matching keys.','Extra indexes speed reads but cost storage and writes.','CREATE INDEX ON orders(user_id)'],
['Storage Engines','See how bytes become durable records.','The engine organizes pages or log segments on disk.','A write-ahead log records changes before data pages update.','Compaction or page maintenance keeps reads efficient.','WAL → durable write → data page'],
['Replication','Keep copies of data on multiple nodes.','A leader accepts writes and sends changes to replicas.','Replicas can serve reads or take over after failure.','Lag means a replica may briefly return older data.','leader → replica A · replica B'],
['Sharding','Partition a growing dataset across machines.','A shard key decides where each record lives.','Routers send reads and writes to the correct shard.','Hot keys and cross-shard queries complicate the design.','hash(user_id) % 4 → shard'],
['Consistent Hashing','Move fewer keys when nodes change.','Place servers and keys on a logical hash ring.','Each key maps to the next server clockwise.','Adding a node moves only a slice of keys.','hash(key) → next ring node'],
['Unique IDs at Scale','Create identifiers without one central bottleneck.','A database sequence gives simple ordered IDs.','Distributed ID schemes combine time and node information.','Plan for collision risk, ordering, and information leakage.','timestamp | node | sequence'],
['CAP & Consistency','Understand tradeoffs during network partitions.','A partition interrupts communication between nodes.','A system may prioritize available responses or consistent reads.','The practical choice depends on each operation, not a slogan.','partition → reject or serve stale'],
['Consensus & Leaders','Coordinate nodes around one agreed decision.','Nodes exchange votes to select a leader.','A majority commits changes to a replicated log.','The system pauses writes if a majority cannot agree.','3 of 5 votes → commit'],
['Transactions & Isolation','Keep multi-step data changes correct.','A transaction groups operations into one unit.','Isolation controls what concurrent transactions can observe.','Locks or MVCC prevent conflicting reads and writes.','BEGIN; UPDATE; COMMIT;'],
['Files & Media','Store large objects outside ordinary database rows.','Upload metadata and bytes through a controlled flow.','Object storage keeps the file while the database stores its key.','Signed URLs and background processing handle delivery and thumbnails.','POST /uploads → object key']
]},
{name:'Communication',color:'#df8c4e',lessons:[
['REST, RPC & GraphQL','Choose an API style that matches client needs.','REST models resources with HTTP methods and URLs.','RPC exposes named actions; GraphQL lets clients select fields.','Schema evolution and caching differ across approaches.','GET /users/7 · createUser() · query'],
['Message Queues','Decouple work that does not need an immediate answer.','A producer adds a job to a durable queue.','A worker claims and processes the job.','Retries and idempotency prevent lost or duplicate effects.','enqueue(emailJob) → worker'],
['Pub/Sub & Events','Notify multiple consumers when something happens.','A publisher emits an event to a topic.','Subscribers react independently to the same event.','Event schemas and delivery guarantees shape reliability.','order.created → email + analytics'],
['Real-time Updates','Push changes to users without constant polling.','Polling repeatedly asks for updates.','WebSockets keep a two-way connection open.','Backpressure and reconnection matter at scale.','server → socket.send(update)']
]},
{name:'Reliability',color:'#528dc0',lessons:[
['Redundancy & Failover','Keep serving when a component fails.','Run multiple instances across failure domains.','Health checks detect when one instance is unavailable.','Traffic shifts to healthy instances while the failed one recovers.','app-A fails → app-B serves'],
['Rate Limiting','Protect services from bursts and abuse.','Track requests per client over a time window.','A token bucket permits short bursts within a steady limit.','Return 429 with a clear retry policy when a client exceeds it.','100 tokens/min → 429 when empty'],
['Timeouts & Retries','Bound how long a request may wait.','A timeout stops waiting for a slow dependency.','Retries can recover transient failure with exponential backoff.','Add jitter and idempotency to avoid retry storms.','retry after 100, 200, 400 ms'],
['Observability','Find the cause of a slow or failed request.','Metrics show rates, errors, and latency trends.','Logs add structured details about individual events.','Traces connect work across service boundaries.','trace_id: 7f32 → span A → span B']
]},
{name:'Architecture',color:'#35a59a',lessons:[
['Monolith vs Microservices','Set service boundaries deliberately.','A monolith deploys related features as one application.','Microservices deploy independently behind network APIs.','Split when team and scaling needs justify operational cost.','orders | payments | accounts'],
['Service Discovery','Find a service even as instances change.','Instances register an address or appear in a control plane.','Clients query a stable service name.','Health information keeps traffic away from dead instances.','orders.internal → 10.0.0.8'],
['Sagas & Distributed Transactions','Coordinate changes across independent services.','A saga breaks a workflow into local transactions.','Each step publishes success or failure.','Compensating actions undo earlier effects when later steps fail.','reserve → charge → ship / refund'],
['Batch & Stream Processing','Process data now or collect it for later.','Batch jobs handle a bounded dataset on a schedule.','Streams handle events continuously as they arrive.','Choose based on freshness, cost, and replay needs.','events → stream → aggregate']
]},
{name:'Security',color:'#c96288',lessons:[
['Authentication','Prove who is making the request.','A user signs in with a credential or identity provider.','The server validates a session or token on each request.','Expiry and revocation limit damage from stolen tokens.','Authorization: Bearer <token>'],
['Authorization','Decide what an identified user can access.','Roles grant broad capabilities to groups of users.','Resource checks enforce ownership and context.','Deny by default and test permissions at the data boundary.','canRead(user, order) → true'],
['Encryption & Secrets','Protect data in transit and at rest.','TLS encrypts traffic between clients and servers.','Encryption at rest protects stored bytes.','Secret managers keep keys out of source code and logs.','TLS + key rotation + secret store']
]},
{name:'Shipping',color:'#85964e',lessons:[
['Testing','Catch failures before users do.','Unit tests verify small rules quickly.','Integration tests check database and service boundaries.','End-to-end tests follow critical user journeys.','unit → integration → end-to-end'],
['CI/CD & Deployments','Ship changes safely and repeatedly.','CI builds and tests every proposed change.','A deployment rolls out the new version gradually.','Health checks and rollback reduce release risk.','commit → test → canary → release']
]},
{name:'Whole Systems',color:'#6c829f',lessons:[
['High-Level & Low-Level Design','Move from boxes and arrows to precise contracts.','High-level design identifies components and data flow.','Low-level design specifies interfaces, schemas, and failure behavior.','Check requirements and bottlenecks at both levels.','API → service → database'],
['Design a URL Shortener','Build a compact, reliable redirect service.','Generate a unique short code for a destination URL.','Store the mapping and redirect on lookup.','Cache popular links and plan for abuse and expiration.','/abc123 → https://example.com'],
['Design a News Feed','Serve relevant posts to many readers.','Store posts and the social graph.','Fan-out can happen on write, on read, or as a hybrid.','Rank results and paginate without duplicates.','follow graph → candidate posts → feed'],
['Design a Chat System','Deliver messages in near real time.','Maintain connections for online users.','Persist each message before acknowledging delivery.','Track ordering, retries, presence, and offline sync.','send → persist → deliver → ack']
]}];

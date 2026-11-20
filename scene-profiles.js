// Each lesson has its own cast of visual objects. The pattern determines how they interact.
const sceneProfiles={
'HTTP Methods, Status Codes & Headers':['chain','CLIENT:browser','METHOD:card','API:cube','STATUS:shield','RESPONSE:card'],
'Runtime & Event Loop':['loop','REQUEST:browser','EVENT LOOP:ring','I/O:cylinder','CALLBACK:card','WORKER:cube'],
'API Contracts & OpenAPI':['chain','CLIENT:browser','CONTRACT:card','VALIDATE:shield','SERVICE:cube','RESPONSE:card'],
'REST, RPC & GraphQL':['fan','CLIENT:browser','API:shield','REST:cube','RPC:cube','GRAPHQL:cube'],
'Validation & Error Design':['fork','INPUT:browser','SCHEMA:card','VALID:cube','INVALID:shield','ERROR:card'],
'Idempotency & Duplicate Requests':['fork','CLIENT:browser','RETRY:queue','KEY:card','PAYMENT:cube','RESULT:cylinder'],
'Vertical vs Horizontal Scaling':['fork','USERS:people','ROUTER:shield','BIG SERVER:cube','POOL:cube','DATA:cylinder'],
'Load Balancing':['fan','USERS:people','BALANCER:shield','SERVER A:cube','SERVER B:cube','SERVER C:cube'],
'Stateless Services':['fork','CLIENT:browser','BALANCER:shield','APP A:cube','APP B:cube','SESSION:cylinder'],
'Caching':['fork','CLIENT:browser','APPLICATION:cube','CACHE:card','DATABASE:cylinder','RESPONSE:card'],
'Content Delivery Networks':['fork','USERS:people','DNS:shield','EDGE A:cube','EDGE B:cube','ORIGIN:cylinder'],
'Relational Database Fundamentals':['hub','APP:cube','SQL:card','TABLE:cylinder','USERS:cylinder','ORDERS:cylinder'],
'Database Indexes':['fork','QUERY:browser','DATABASE:cylinder','FULL SCAN:queue','INDEX:card','ROW:cylinder'],
'Transactions & Isolation':['fork','CLIENT A:browser','DATABASE:cylinder','CLIENT B:browser','LOCK:shield','COMMIT:card'],
'Database Migrations':['chain','OLD APP:cube','SCHEMA:cylinder','ADD COLUMN:card','BACKFILL:queue','NEW APP:cube'],
'Replication':['fan','APP:cube','LEADER:cylinder','FOLLOWER A:cylinder','FOLLOWER B:cylinder','BACKUP:cylinder'],
'Sharding':['fan','CLIENT:browser','ROUTER:shield','SHARD A:cylinder','SHARD B:cylinder','SHARD C:cylinder'],
'CAP & Consistency':['fork','CLIENT:browser','PARTITION:shield','NODE A:cylinder','NODE B:cylinder','DECISION:card'],
'Files & Media':['chain','UPLOADER:browser','API:cube','OBJECT STORE:cylinder','WORKER:queue','CDN:cube'],
'Message Queues':['fan','PRODUCER:browser','QUEUE:queue','WORKER A:cube','WORKER B:cube','DLQ:queue'],
'Pub/Sub & Events':['fan','PUBLISHER:cube','TOPIC:queue','EMAIL:cube','ANALYTICS:cube','SEARCH:cube'],
'Delivery Guarantees & Idempotent Consumers':['fork','PRODUCER:browser','BROKER:queue','WORKER:cube','ACK:card','DEDUP:cylinder'],
'Real-time Updates':['fan','EVENT:cube','GATEWAY:shield','SOCKET A:browser','SOCKET B:browser','OFFLINE:queue'],
'Authentication':['chain','LOGIN:browser','IDENTITY:shield','PASSWORD:card','SESSION:cylinder','API:cube'],
'Authorization':['fork','CALLER:browser','IDENTITY:shield','POLICY:card','RESOURCE:cylinder','AUDIT:queue'],
'Input Safety & Web Threats':['fork','INPUT:browser','VALIDATE:shield','QUERY:card','DATABASE:cylinder','REJECT:shield'],
'Encryption & Secrets':['chain','CLIENT:browser','TLS:shield','SERVICE:cube','SECRET:card','STORAGE:cylinder'],
'Redundancy & Failover':['fork','USERS:people','ROUTER:shield','PRIMARY:cube','STANDBY:cube','STORE:cylinder'],
'Rate Limiting':['fork','CLIENTS:people','LIMITER:shield','TOKENS:card','API:cube','429:card'],
'Timeouts & Retries':['fork','CLIENT:browser','DEADLINE:card','SERVICE:cube','RETRY:queue','FALLBACK:cube'],
'Backups & Disaster Recovery':['fork','APP:cube','DATABASE:cylinder','SNAPSHOT:card','BACKUP:cylinder','RESTORE:cube'],
'Observability':['fan','REQUEST:browser','TRACE:ring','METRICS:card','LOGS:card','ALERT:shield'],
'Monolith vs Microservices':['fork','USERS:people','MONOLITH:cube','GATEWAY:shield','SERVICE A:cube','SERVICE B:cube'],
'Sagas & Distributed Transactions':['chain','ORDER:browser','RESERVE:cube','CHARGE:cube','SHIP:cube','COMPENSATE:queue'],
'Batch & Stream Processing':['fork','EVENTS:queue','INGEST:cube','BATCH:cylinder','STREAM:ring','RESULT:card'],
'Testing':['chain','CHANGE:card','UNIT:shield','INTEGRATION:cube','END TO END:browser','RELEASE:cube'],
'Containers & Images':['chain','SOURCE:card','IMAGE:cube','REGISTRY:cylinder','CONTAINER:cube','SERVICE:shield'],
'High-Level & Low-Level Design':['hub','REQUIREMENTS:card','SYSTEM:cloud','API:shield','DATA:cylinder','FAILURES:queue'],
'Design a URL Shortener':['chain','CREATOR:browser','API:cube','CODE:card','MAPPING:cylinder','REDIRECT:shield'],
'Design a News Feed':['fork','AUTHOR:browser','POST:cylinder','FAN OUT:queue','FEED:cylinder','READER:browser'],
'Design a Chat System':['chain','SENDER:browser','GATEWAY:shield','MESSAGE:cylinder','DELIVERY:queue','RECIPIENT:browser']
};
const scenePatterns={
chain:{points:[[125,266],[305,266],[485,266],[665,266],[845,266]],edges:[[0,1],[1,2],[2,3],[3,4]]},
fan:{points:[[120,266],[350,266],[650,115],[650,266],[650,417]],edges:[[0,1],[1,2],[1,3],[1,4]]},
fork:{points:[[125,266],[345,266],[610,130],[610,385],[855,266]],edges:[[0,1],[1,2],[1,3],[2,4],[3,4]]},
hub:{points:[[125,266],[345,266],[555,266],[815,135],[815,385]],edges:[[0,1],[1,2],[2,3],[2,4]]},
loop:{points:[[155,295],[365,150],[610,150],[825,295],[500,385]],edges:[[0,1],[1,2],[2,3],[3,4],[4,0]]}
};
function sceneProfileLayout(lesson){const profile=sceneProfiles[lesson.title];if(!profile)return null;const pattern=scenePatterns[profile[0]],nodes=profile.slice(1).map((value,i)=>{const [label,shape]=value.split(':'),[x,y]=pattern.points[i];return [label.toLowerCase().replace(/[^a-z0-9]+/g,'-'),x,y,shape,label]});return {kind:profile[0],nodes,edges:pattern.edges.map(([a,b])=>[nodes[a][0],nodes[b][0]]),fallback:['Load Balancing','Stateless Services','Redundancy & Failover','Content Delivery Networks'].includes(lesson.title)}}
const sceneFailureTargets={
'HTTP Methods, Status Codes & Headers':3,'Runtime & Event Loop':1,'API Contracts & OpenAPI':1,'REST, RPC & GraphQL':2,'Validation & Error Design':0,'Idempotency & Duplicate Requests':3,
'Vertical vs Horizontal Scaling':2,'Load Balancing':2,'Stateless Services':2,'Caching':2,'Content Delivery Networks':2,
'Relational Database Fundamentals':2,'Database Indexes':2,'Transactions & Isolation':1,'Database Migrations':2,'Replication':2,'Sharding':2,'CAP & Consistency':1,'Files & Media':2,
'Message Queues':2,'Pub/Sub & Events':2,'Delivery Guarantees & Idempotent Consumers':2,'Real-time Updates':2,
'Authentication':3,'Authorization':2,'Input Safety & Web Threats':0,'Encryption & Secrets':3,
'Redundancy & Failover':2,'Rate Limiting':1,'Timeouts & Retries':2,'Backups & Disaster Recovery':1,'Observability':1,
'Monolith vs Microservices':1,'Sagas & Distributed Transactions':2,'Batch & Stream Processing':3,
'Testing':2,'Containers & Images':1,'High-Level & Low-Level Design':2,'Design a URL Shortener':3,'Design a News Feed':3,'Design a Chat System':2
};
Object.assign(sceneProfiles,{
'DNS, TCP & TLS':['chain','BROWSER:browser','DNS:cloud','CONNECT:shield','TLS:shield','SERVER:cube'],
'Git & Repository Workflows':['chain','CHANGE:card','COMMIT:card','REVIEW:shield','MERGE:queue','RELEASE:cube'],
'Hosting & Infrastructure Basics':['chain','CLIENT:browser','DNS:cloud','EDGE:shield','HOST:cube','DATABASE:cylinder'],
'SQL vs NoSQL':['fork','QUERY:browser','ACCESS:shield','TABLES:cylinder','DOCUMENTS:cylinder','DECISION:card'],
'Consensus & Leaders':['fan','PROPOSAL:card','QUORUM:ring','NODE A:cube','NODE B:cube','NODE C:cube'],
'Backpressure & Dead-Letter Queues':['fork','PRODUCER:browser','QUEUE:queue','WORKERS:cube','RETRY:queue','DLQ:queue'],
'Password Hashing & Credentials':['chain','PASSWORD:browser','SALT:card','ARGON2:shield','HASH:cylinder','LOGIN:cube'],
'Sessions, Cookies & OAuth':['fork','BROWSER:browser','COOKIE:card','SESSION:cylinder','OAUTH:shield','API:cube'],
'SLOs & Error Budgets':['chain','USERS:people','SLI:card','SLO:shield','BUDGET:cylinder','RELEASE:cube'],
'Orchestration & Autoscaling':['fork','TRAFFIC:people','SCHEDULER:shield','POD A:cube','POD B:cube','DATABASE:cylinder']
});
Object.assign(sceneFailureTargets,{'DNS, TCP & TLS':3,'Git & Repository Workflows':2,'Hosting & Infrastructure Basics':3,'SQL vs NoSQL':2,'Consensus & Leaders':2,'Backpressure & Dead-Letter Queues':2,'Password Hashing & Credentials':2,'Sessions, Cookies & OAuth':2,'SLOs & Error Budgets':3,'Orchestration & Autoscaling':2});

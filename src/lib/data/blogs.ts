export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'building-scalable-microservices',
    title: 'Building Scalable Microservices with Node.js',
    excerpt:
      'Learn how to design and implement scalable microservices architecture using Node.js, RabbitMQ, and Redis for inter-service communication.',
    content: `
# Building Scalable Microservices with Node.js

Microservices architecture has become the go-to approach for building large-scale applications. In this article, I'll share my experience building a real-time chat application using microservices.

## Why Microservices?

Traditional monolithic applications can become difficult to maintain and scale as they grow. Microservices solve this by breaking down the application into smaller, independent services.

## Key Components

### 1. Message Queue (RabbitMQ)
RabbitMQ acts as the backbone for inter-service communication. It ensures reliable message delivery with features like:
- Message persistence
- Dead letter queues
- Retry mechanisms

### 2. Caching Layer (Redis)
Redis provides lightning-fast caching and pub/sub capabilities:
- Session management
- Real-time presence tracking
- Rate limiting

### 3. API Gateway
A central entry point that handles:
- Request routing
- Authentication
- Rate limiting

## Best Practices

1. **Design for failure** - Services should handle partial failures gracefully
2. **Use async communication** - Prefer message queues over synchronous calls
3. **Implement health checks** - Monitor service health continuously
4. **Document APIs** - Use OpenAPI/Swagger for API documentation

## Conclusion

Building microservices requires careful planning but pays off in scalability and maintainability.
    `,
    date: 'Jan 15, 2026',
    readTime: '8 min',
    tags: ['Node.js', 'Microservices', 'RabbitMQ', 'Redis'],
  },
  {
    id: '2',
    slug: 'websocket-architecture',
    title: 'Understanding WebSocket Architecture',
    excerpt:
      'A deep dive into WebSocket protocol and how to implement real-time features in your applications with proper scaling strategies.',
    content: `
# Understanding WebSocket Architecture

WebSockets enable real-time, bidirectional communication between clients and servers. Here's how to implement them effectively.

## WebSocket vs HTTP

Unlike HTTP's request-response model, WebSocket maintains a persistent connection, allowing:
- Real-time updates
- Lower latency
- Reduced overhead

## Implementation Tips

### Connection Management
\`\`\`javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('message', (data) => {
    // Handle message
  });
  
  socket.on('disconnect', () => {
    // Cleanup
  });
});
\`\`\`

### Scaling WebSockets
Use Redis adapter for horizontal scaling:
- Sticky sessions
- Redis pub/sub for cross-server communication

## Conclusion

WebSockets are essential for modern real-time applications.
    `,
    date: 'Jan 10, 2026',
    readTime: '6 min',
    tags: ['WebSocket', 'Real-time', 'Node.js'],
  },
  {
    id: '3',
    slug: 'ml-model-deployment',
    title: 'Machine Learning Model Deployment Guide',
    excerpt:
      'Step-by-step guide to deploying machine learning models to production using Flask and best practices for serving predictions.',
    content: `
# Machine Learning Model Deployment Guide

Deploying ML models to production requires careful consideration of performance, scalability, and reliability.

## Deployment Options

1. **REST API (Flask/FastAPI)** - Simple and widely used
2. **Serverless** - AWS Lambda, Google Cloud Functions
3. **Containers** - Docker + Kubernetes

## Flask Deployment Example

\`\`\`python
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prediction = model.predict([data['features']])
    return jsonify({'prediction': prediction.tolist()})
\`\`\`

## Best Practices

- Input validation
- Error handling
- Logging and monitoring
- Model versioning
- A/B testing

## Conclusion

Choose the deployment method based on your scale and requirements.
    `,
    date: 'Dec 28, 2025',
    readTime: '7 min',
    tags: ['Machine Learning', 'Python', 'Flask', 'Deployment'],
  },
  {
    id: '4',
    slug: 'react-performance',
    title: 'Optimizing React Performance',
    excerpt:
      'Practical techniques to improve React application performance including memoization, code splitting, and render optimization.',
    content: `
# Optimizing React Performance

Performance optimization is crucial for providing a great user experience. Here are key techniques.

## Key Techniques

### 1. React.memo
Prevent unnecessary re-renders:
\`\`\`jsx
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
\`\`\`

### 2. useMemo & useCallback
Cache expensive computations and callbacks:
\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a), [a]);
\`\`\`

### 3. Code Splitting
Lazy load components:
\`\`\`jsx
const LazyComponent = React.lazy(() => import('./Component'));
\`\`\`

### 4. Virtual Lists
For long lists, use virtualization libraries.

## Conclusion

Profile first, then optimize based on data.
    `,
    date: 'Dec 20, 2025',
    readTime: '5 min',
    tags: ['React', 'Performance', 'JavaScript'],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

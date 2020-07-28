using System;
using System.Runtime.Serialization;

namespace CommonComponents.Exceptions
{
    [Serializable]
    public class ValidationException<T> : Exception
        where T : class
    {
        public ValidationException()
        {
        }

        public ValidationException(string message)
            : base(message)
        {
        }

        public ValidationException(T item, string customMessage)
            : base(customMessage)
        {
            Item = item;
        }

        public ValidationException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected ValidationException(SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext)
        {
            // Like a
            throw new NotImplementedException();
        }

        public T Item { get; set; }
    }
}

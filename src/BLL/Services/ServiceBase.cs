using BLL.Interfaces;
using CommonComponents.Exceptions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services
{
    public abstract class ServiceBase<T> : IService<T>
        where T : class
    {
        public abstract Task<T> AddAsync(T item);
        public abstract Task Delete(T item);
        public abstract Task<IEnumerable<T>> GetAllAsync();
        public abstract Task<T> GetByIdAsync(int id);
        public abstract Task Update(T item);

        /// <summary>
        /// Check if item is null.
        /// </summary>
        /// <param name="item">Item that will be checked.</param>
        public void CheckOnNull(T item)
        {
            if (item == null)
            {
                throw new ValidationException<T>(item, "Item cannot be null.");
            }
        }
    }
}

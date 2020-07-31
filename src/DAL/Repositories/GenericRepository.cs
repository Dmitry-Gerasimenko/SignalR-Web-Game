using DAL.Context;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class GenericRepository<T> : IRepository<T>
        where T : class
    {
        public GenericRepository(CustomApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        private readonly CustomApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task DeleteAsync(int id)
        {
            _dbSet.Remove(_dbSet.Find(id));

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }
    }
}

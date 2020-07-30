using AutoMapper;
using BLL.Interfaces;
using CommonComponents.CommonModels;
using DAL.Interfaces;
using DAL.Model.Chat;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class MessagesService : ServiceBase<MessageDto>
    {
        private readonly IRepository<Message> _messagesRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public MessagesService(IRepository<Message> messagesRepository,
            UserManager<ApplicationUser> userManager,
            IMapper mapper)
        {
            _messagesRepository = messagesRepository;
            _userManager = userManager;
            _mapper = mapper;
        }

        public override async Task<MessageDto> AddAsync(MessageDto item)
        {
            // Validate.
            CheckOnNull(item);

            // Add.
            var addedMessage = await _messagesRepository.AddAsync(new Message
            {
                 CreationDate = item.CreationDate,
                 ApplicationUserId = item.ApplicationUserId,
                 Text = item.Text,
                 User = await _userManager.FindByIdAsync(item.ApplicationUserId),
            });

            return _mapper.Map<MessageDto>(addedMessage);
        }

        public override async Task Delete(MessageDto item)
        {
            CheckOnNull(item);

            await _messagesRepository.DeleteAsync(item.Id);
        }

        public override async Task<IEnumerable<MessageDto>> GetAllAsync()
        {
            return _mapper.Map<IEnumerable<MessageDto>>(await _messagesRepository.GetAllAsync());
        }

        public override async Task<MessageDto> GetByIdAsync(int id)
        {
            return _mapper.Map<MessageDto>(await _messagesRepository.GetByIdAsync(id));
        }

        public override async Task Update(MessageDto item)
        {
            CheckOnNull(item);

            await _messagesRepository.UpdateAsync(_mapper.Map<Message>(item));
        }
    }
}

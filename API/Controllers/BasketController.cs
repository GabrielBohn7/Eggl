using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IGenericRepository<Product> _productsRepo;

        public BasketController(IBasketRepository basketRepository, IGenericRepository<Product> productsRepo)
        {
            _productsRepo = productsRepo;
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket (CustomerBasket basket)
        {
            if(basket.Item.Count == 0){
                var spec = new ProductsWithCategoriasSpecification(basket.ProductId);

                var product = await _productsRepo.GetEntityWithSpec(spec);

                basket.Item = new List<BasketItem>();

                var ItemBasket = new BasketItem();
                ItemBasket.Id = product.Id;
                ItemBasket.ProductNome = product.Nome;
                ItemBasket.preco = product.Preco;
                ItemBasket.Categoria = "FOOD SERVICE";
                ItemBasket.Quantidade = 1;

                basket.Item.Add(ItemBasket);
            }
            var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }

    }
}
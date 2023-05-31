import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

type ProductCardTypes = {product: Product};

export default function ProductCard({product}: ProductCardTypes) {
  const {title, variants} = product;
  const {price, compareAtPrice, image} = variants?.nodes[0] ?? {};
  const isDiscounted = compareAtPrice
    ? compareAtPrice.amount > price?.amount
    : false;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-6">
        <div className="shadow-sm rounded relative">
          {isDiscounted && (
            <div className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
              Sale
            </div>
          )}
          {image && (
            <Image
              data={image}
              alt={product.title}
              sizes="(max-width: 32em) 100vw, 33vw"
            />
          )}
        </div>
        <div className="grid gap-1">
          <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis ">
            {product.title}
          </h3>
          <div className="flex gap-4">
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && compareAtPrice && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

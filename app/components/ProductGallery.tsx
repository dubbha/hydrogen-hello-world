import {MediaFile} from '@shopify/hydrogen-react';
import type {
  MediaContentType,
  MediaImage,
  Model3d,
  Video,
  ExternalVideo,
  MediaConnection,
} from '@shopify/hydrogen-react/storefront-api-types';

type MediaNodeTypeName =
  | ExternalVideo['__typename']
  | MediaImage['__typename']
  | Model3d['__typename']
  | Video['__typename'];

const typeNameMap: {[key in MediaContentType]: MediaNodeTypeName} = {
  MODEL_3D: 'Model3d',
  VIDEO: 'Video',
  IMAGE: 'MediaImage',
  EXTERNAL_VIDEO: 'ExternalVideo',
};

type ProductGalleryProps = {
  mediaNodes: MediaConnection['nodes'];
};

export default function ProductGallery({mediaNodes}: ProductGalleryProps) {
  if (!mediaNodes.length) {
    return null;
  }

  return (
    <div
      className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
    >
      {mediaNodes.map((node, i) => {
        let extraProps = {};

        if (node.mediaContentType === 'MODEL_3D') {
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true,
            style: {height: '100%', margin: '0 auto'},
          };
        }

        const data = {
          ...node,
          __typename: typeNameMap[node.mediaContentType],
          ...('image' in node
            ? {
                image: {
                  ...node.image,
                  altText: node.alt || 'Product image',
                },
              }
            : {}),
        };

        return (
          <div
            className={`${
              i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
            } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
            key={data.id || data.image?.id}
          >
            <MediaFile
              tabIndex={0}
              className={`w-full h-full aspect-square object-cover`}
              data={data as MediaConnection['nodes'][0]}
              mediaOptions={{
                image: {
                  sizes: '(max-width: 768px) 100vw, 50vw',
                },
              }}
              {...extraProps}
            />
          </div>
        );
      })}
    </div>
  );
}

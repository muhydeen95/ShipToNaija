import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';

const webappMainContentPadding: string = '1rem';

export const websiteRouteAnimations = trigger('websiteRouteAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: '0rem',
          left: '0rem',
          bottom: '0rem',
          right: '0rem',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '0.25s ease',
          style({
            opacity: 1,
          })
        ),
      ],
      {
        optional: true,
      }
    ),
  ]),
]);

export const webappRouteAnimations = trigger('webappRouteAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: webappMainContentPadding,
          left: webappMainContentPadding,
          bottom: webappMainContentPadding,
          right: webappMainContentPadding,
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '0.15s ease',
          style({
            opacity: 1,
          })
        ),
      ],
      {
        optional: true,
      }
    ),
  ]),
]);
